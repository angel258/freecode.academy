/* eslint-disable */

/** 
* ФАЙЛ ГЕНЕРИРУЕТСЯ АВТОМАТИЧЕСКИ, ПРАВИТЬ ЕГО НЕ НУЖНО 
* Команда для генерирования этого файла: "yarn generate:types" 
*/


import { UserNoNestingFragment } from './UserNoNesting';
import { gql } from '@apollo/client';
import { UserNoNestingFragmentDoc } from './UserNoNesting';
export type BlogsConnectionUserFragment = (
  { __typename?: 'User' }
  & UserNoNestingFragment
);

export const BlogsConnectionUserFragmentDoc = gql`
    fragment BlogsConnectionUser on User {
  ...UserNoNesting
}
    ${UserNoNestingFragmentDoc}`;