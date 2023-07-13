import * as S from './Pagination.style'

import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC } from 'react'

interface Props {
  shape?: 'pill' | 'brick'
  weight?: 'ghost' | 'solid' | 'outlined'
  size?: 'small' | 'medium' | 'large' | 'relative'
  totalPage: number
  limit?: number
  nowPage: number
  handlePage: (page: number) => void
}

/**
 *
 * @param totalPage 총 페이지 개수
 * @param limit 몇 개씩 페이지네이션 ex. 10개씩 -> 1~10, 11~20
 * @param nowPage 현재 페이지 number
 * @param handlePage 페이지를 바꾸는 onClick 이벤트 함수
 */
const Pagination: FC<Props> = ({
  shape = 'pill',
  weight = 'outlined',
  size = 'small',
  totalPage,
  limit = 10,
  nowPage = 1,
  handlePage = (page: number) => null,
}) => {
  const startPage = Math.floor((nowPage - 1) / limit) * limit + 1 // 시작 페이지 number. ex. 지금 14페이지라면 시작 페이지는 11입니다.
  let endPage = startPage + limit - 1 // 끝 페이지 번호. ex. 지금 14페이지라면 끝 페이지는 20입니다.
  if (endPage >= totalPage) endPage = totalPage // 끝 페이지 번호 수정용. ex. 최종 마지막 페이지가 19라면 20이 끝 페이지가 아니라 19가 됩니다.

  const createArray = (start: number, end: number) => {
    return Array(end - start + 1)
      .fill(0)
      .map((_, i) => start + i)
  }
  const arrow = {
    prev: <FontAwesomeIcon icon={faChevronLeft} />,
    next: <FontAwesomeIcon icon={faChevronRight} />,
  }

  return (
    <S.Wrapper>
      <S.Container
        shape={shape}
        weight={weight}>
        <S.PageBtn size={size}>{arrow.prev}</S.PageBtn>
        {createArray(startPage, endPage).map((_, i) => (
          <S.PageBtn
            key={i}
            size={size}
            isThisPage={nowPage === i + 1}
            onClick={() => handlePage(i + 1)}>
            {i + 1}
          </S.PageBtn>
        ))}
        <S.PageBtn size={size}>{arrow.next}</S.PageBtn>
      </S.Container>
    </S.Wrapper>
  )
}
export default Pagination
