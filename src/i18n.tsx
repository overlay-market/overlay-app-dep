import { useEffect, useState } from 'react';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { ReactNode } from 'react';
import { useActiveLocale, useSetLocaleFromUrl } from './hooks/useActiveLocale';
import { SupportedLocale } from './constants/locales';