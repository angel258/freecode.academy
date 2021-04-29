import React from 'react'
import { NextComponentType, NextPageContext } from 'next'
import {
  ApolloClient,
  // ApolloQueryResult,
  NormalizedCacheObject,
} from '@apollo/client'
// import URI from 'urijs'
// import { NextRouter } from 'next/router'
// import { Maybe, MeUserFragment } from 'src/modules/gql/generated'
// import { muiTheme } from './MUI/theme'
import { AppContext, AppInitialProps as NextAppInitialProps } from 'next/app'

export interface LayoutStyledProps {
  variant?: 'default' | 'fullwidth' | 'office'
}

/**
 * Расширенный контекст страниц приложения
 */
export interface NextPageContextCustom extends NextPageContext {
  /**
   * Аполло-клиент, чтобы в страницах и документе можно было
   * получить его в getInitialProps и вызвать запросы.
   * Надо именно так, чтобы иметь на выходе общий стейт клиента.
   */
  apolloClient: ApolloClientNormolized
}

export interface PageProps
  extends React.PropsWithChildren<Record<string, unknown>> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialApolloState?: any

  /**
   * Apollo-client API query
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  queryResult?: any

  /**
   * Серверная ошибка
   */
  statusCode?: number

  /**
   * Настройки основного контейнера
   */
  layout?: LayoutStyledProps
}

/**
 * Свойства для основного приложения
 */
export type AppProps = {
  Component: Page
  pageProps: PageProps
}

// TODO: обновить аполло-клиент
/**
 * API-клиент
 */
export type ApolloClientNormolized = ApolloClient<NormalizedCacheObject>

/**
 * Свойства, передаваемые в @prisma-cms/context
 */
// export type PrismaCmsContext = {
//   uri: ReturnType<typeof URI>

//   client: ApolloClientNormolized

//   // TODO: убрать из контекста
//   router: NextRouter

//   // TODO: убрать из контекста
//   /**
//    * GraphQL-запросы
//    */
//   query?: any | null

//   user?: Maybe<MeUserFragment>

//   logout: () => void

//   openLoginForm: () => void

//   lang: string

//   theme: typeof muiTheme

//   localStorage: typeof global.localStorage | undefined

//   /**
//    * Сброс кеша аполло-клиента.
//    * Делаем пока через такой хак, потому что в текущем компоненте apollo-cms
//    * используется старый аполло-клиент
//    */
//   apiClientResetStore: () => Promise<void | ApolloQueryResult<any>[] | null>
// }

/**
 * Страница с кастомным контекстом
 */
export type Page<P extends PageProps = PageProps, IP = P> = NextComponentType<
  NextPageContextCustom,
  IP,
  P
>

export interface AppInitialProps extends NextAppInitialProps {
  pageProps: PageProps
}

export type MainApp<P = AppProps> = React.FC<P> & {
  getInitialProps(context: AppContext): Promise<AppInitialProps>
}
