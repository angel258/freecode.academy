import { Scalars } from 'src/modules/gql/generated'

/**
 * Возвращает перевод технологического уровня
 */
export const getUserTechnologyLevelText = (
  level: Scalars['UserTechnologyLevel']
): string => {
  switch (level) {
    case 1:
      return 'Начальный'

    case 2:
      return 'Ниже среднего'

    case 3:
      return 'Средний'

    case 4:
      return 'Уверенный'

    case 5:
      return 'Эксперт'

    default:
      return ''
  }
}
