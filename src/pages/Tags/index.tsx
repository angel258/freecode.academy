import Head from 'next/head'
import React, { useMemo } from 'react'
import {
  TagsConnectionDocument,
  TagsConnectionQueryVariables,
  TagsConnectionQuery,
  useTagsConnectionQuery,
} from 'src/modules/gql/generated'

import View from './View'

import { Page } from '../_App/interfaces'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'

const first = 10

const defaultVariables: TagsConnectionQueryVariables = {
  where: {},
  first,
}

function getQueryParams(query: ParsedUrlQuery) {
  let skip: number | undefined

  const page =
    (query.page && typeof query.page === 'string' && parseInt(query.page)) || 0

  if (page > 1) {
    skip = (page - 1) * first
  }

  return {
    skip,
    first,
    page,
  }
}

const TagsPage: Page = () => {
  const router = useRouter()

  const { query } = router

  const { page, ...queryVariables } = useMemo(() => {
    return {
      ...defaultVariables,
      ...getQueryParams(query),
    }
  }, [query])

  const response = useTagsConnectionQuery({
    variables: queryVariables,
    onError: console.error,
  })

  const { variables, loading } = response

  return (
    <>
      <Head>
        <title>Теги</title>
        <meta name="description" content="Все теги сайта" />
      </Head>

      <View
        // {...queryResult}
        loading={loading}
        // data={response || null}
        objects={response.data?.tags || []}
        count={response.data?.tagsCount || 0}
        variables={variables}
        page={page}
      />
    </>
  )
}

TagsPage.getInitialProps = async (context) => {
  const { apolloClient } = context

  const result = await apolloClient.query<TagsConnectionQuery>({
    query: TagsConnectionDocument,

    /**
     * Важно, чтобы все переменные запроса серверные и фронтовые совпадали,
     * иначе при рендеринге не будут получены данные из кеша и рендер будет пустой.
     */
    variables: {
      ...defaultVariables,
      ...getQueryParams(context.query),
    },
  })

  return {
    statusCode: !result.data.tags.length ? 404 : undefined,
  }
}

export default TagsPage
