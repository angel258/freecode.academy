/* eslint-disable */

/** 
* ФАЙЛ ГЕНЕРИРУЕТСЯ АВТОМАТИЧЕСКИ, ПРАВИТЬ ЕГО НЕ НУЖНО 
* Команда для генерирования этого файла: "yarn generate:types" 
*/

// @ts-ignore
import { EditorComponentObject } from '@prisma-cms/front-editor'


import { UserNoNestingFragment } from './UserNoNesting';
import { gql } from '@apollo/client';
import { UserNoNestingFragmentDoc } from './UserNoNesting';
export type ChatRoomsConnectionUserFragment = (
  { __typename?: 'User' }
  & UserNoNestingFragment
);

export const ChatRoomsConnectionUserFragmentDoc = gql`
    fragment chatRoomsConnectionUser on User {
  ...UserNoNesting
}
    ${UserNoNestingFragmentDoc}`;