import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Redis } from 'ioredis';

export enum CircuitBreakerStates {
  OPENED = "OPENED",
  CLOSED = "CLOSED",
  HALF = "HALF"
}

interface CircuitBreakerOptions {
  redis: Redis;
  serviceId: string;
  failureThreshold?: number;
  timeout?: number;
}

interface CircuitBreakerState {
  state: CircuitBreakerStates;
  failureCount: number;
  resetAfter: number;
}

export class CircuitBreaker {
  private request: AxiosRequestConfig;
  private redis: Redis;
  private serviceId: string;
  private failureThreshold: number;
  private timeout: number;

  constructor(request: AxiosRequestConfig, options: CircuitBreakerOptions) {
    this.request = request;
    this.redis = options.redis;
    this.serviceId = options.serviceId;
    this.failureThreshold = options.failureThreshold ?? 5;
    this.timeout = options.timeout ?? 5000;
  }

  async fire(): Promise<any> {
    const key = `cb:${this.serviceId}`;
    const state = await this.redis.hgetall(key);

    const circuitState: CircuitBreakerState = {
      state: (state.state as CircuitBreakerStates) || CircuitBreakerStates.CLOSED,
      failureCount: parseInt(state.failureCount || '0', 10),
      resetAfter: parseInt(state.resetAfter || '0', 10)
    };

    if (circuitState.state === CircuitBreakerStates.OPENED) {
      if (circuitState.resetAfter <= Date.now()) {
        circuitState.state = CircuitBreakerStates.HALF;
        await this.redis.hset(key, 'state', CircuitBreakerStates.HALF);
      } else {
        return console.error('Circuit is in OPEN state. Try again later.');
      }
    }

    try {
      const response: AxiosResponse = await axios(this.request);
      if (response.status === 200) {
        return this.success(key, circuitState, response.data);
      }
      return this.failure(key, circuitState, response.data);
    } catch (error: any) {
      return this.failure(key, circuitState, error?.message || 'Unknown error');
    }
  }

  private async success(key: string, circuitState: CircuitBreakerState, data: any): Promise<any> {
    circuitState.failureCount = 0;

    if (circuitState.state === CircuitBreakerStates.HALF) {
      circuitState.state = CircuitBreakerStates.CLOSED;
    }

    await this.redis.hmset(key, {
      failureCount: '0',
      state: circuitState.state
    });

    return data;
  }

  private async failure(key: string, circuitState: CircuitBreakerState, data: any): Promise<any> {
    circuitState.failureCount += 1;

    if (
      circuitState.state === CircuitBreakerStates.HALF ||
      circuitState.failureCount >= this.failureThreshold
    ) {
      circuitState.state = CircuitBreakerStates.OPENED;
      circuitState.resetAfter = Date.now() + this.timeout;

      await this.redis.hmset(key, {
        state: circuitState.state,
        resetAfter: circuitState.resetAfter.toString(),
        failureCount: circuitState.failureCount.toString()
      });
    } else {
      await this.redis.hset(key, 'failureCount', circuitState.failureCount.toString());
    }

    return data;
  }
}
