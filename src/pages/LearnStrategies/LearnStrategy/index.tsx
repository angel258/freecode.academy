import React, { useMemo } from 'react'
import {
  useLearnStrategyQuery,
  LearnStrategyDocument,
  LearnStrategyQuery,
  LearnStrategyQueryVariables,
} from 'src/modules/gql/generated'

import { LearnStrategyPageView } from './View'

import { Page, NextPageContextCustom } from '../../_App/interfaces'
import { useRouter, NextRouter } from 'next/router'
import { LearnStrategyPageStyled } from './styles'
import { NextSeo } from 'next-seo'

const getLearnStrategyVariables = (
  router: NextRouter | NextPageContextCustom
) => {
  const id = router.query.id

  const variables: LearnStrategyQueryVariables = {
    where: {},
  }

  if (id && typeof id === 'string') {
    variables.where.id = id
  }

  return variables
}

export const LearnStrategyPage: Page = () => {
  const router = useRouter()

  const variables = useMemo(() => {
    return getLearnStrategyVariables(router)
  }, [router])

  const response = useLearnStrategyQuery({
    variables,
    onError: console.error,
  })

  return useMemo(() => {
    const learnStrategy = response.data?.learnStrategy

    if (!learnStrategy) {
      return null
    }

    return (
      <>
        <NextSeo
          title={learnStrategy.name}
          description={learnStrategy.description || learnStrategy.name}
        />

        <LearnStrategyPageStyled>
          <LearnStrategyPageView learnStrategy={learnStrategy} />
        </LearnStrategyPageStyled>
      </>
    )
  }, [response.data?.learnStrategy])
}

LearnStrategyPage.getInitialProps = async (context) => {
  const { apolloClient } = context

  const variables = getLearnStrategyVariables(context)

  const response = variables.where
    ? await apolloClient.query<LearnStrategyQuery>({
        query: LearnStrategyDocument,

        /**
         * Важно, чтобы все переменные запроса серверные и фронтовые совпадали,
         * иначе при рендеринге не будут получены данные из кеша и рендер будет пустой.
         */
        variables,
      })
    : null

  const LearnStrategy = response?.data?.learnStrategy

  // TODO надо прописать рекурсивное получение данных дочерних стратегий,
  // чтобы SSR корректно отработал

  return {
    // TODO Adde canonical redirect
    statusCode: !LearnStrategy ? 404 : undefined,
  }
}
