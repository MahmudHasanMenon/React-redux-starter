/* eslint-disable @typescript-eslint/no-explicit-any */
import {locale} from '../Constants/locale';
import {ApiError} from './request';

export const getErrorMessage = (error: ApiError | any) => {
    try {
      const errorMessage = error?.response?.data.message ?? '';
      return errorMessage.length ? errorMessage : locale.errors.generic;
    } catch {
      return locale.errors.generic;
    }
  };