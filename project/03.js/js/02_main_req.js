// 데이터베이스의 데이터를 임의로 만들자(JSON)

// 메인 화면의 CARD 형식의 광고 데이터
const mains = [
    {
        id: 'M001', // 식별 ID(유티크한 ID) key
        icon: '../images/edu_icon.png',
        title: '에듀윌 1',
        label:  '🚨기간한정 특별 이벤트 1🚨\n초시생 필수템, 만화입문서 무료배포!\n#합격자수1위 #에듀윌 #공인중개사',
        company: 'EDUWILL>NET',
        text: '입문교재 선착순 무료신청\n합격자 수 1위 에듀월 공인중개사',
        img: '../images/game-a.jpg'
    },
    {
        id: 'M002', // 식별 ID(유티크한 ID) key
        icon: '../images/edu_icon.png',
        title: '에듀윌 2',
        label:  '🚨기간한정 특별 이벤트 1🚨\n초시생 필수템, 만화입문서 무료배포!\n#합격자수1위 #에듀윌 #공인중개사',
        company: 'EDUWILL>NET',
        text: '입문교재 선착순 무료신청\n합격자 수 1위 에듀월 공인중개사',
        img: '../images/game-b.jpg'
    },
    {
        id: 'M003', // 식별 ID(유티크한 ID) key
        icon: '../images/edu_icon.png',
        title: '에듀윌 3',
        label:  '🚨기간한정 특별 이벤트 1🚨\n초시생 필수템, 만화입문서 무료배포!\n#합격자수1위 #에듀윌 #공인중개사',
        company: 'EDUWILL>NET',
        text: '입문교재 선착순 무료신청\n합격자 수 1위 에듀월 공인중개사',
        img: '../images/game-c.jpg'
    },
    {
        id: 'M004', // 식별 ID(유티크한 ID) key
        icon: '../images/edu_icon.png',
        title: '에듀윌 4',
        label:  '🚨기간한정 특별 이벤트 1🚨\n초시생 필수템, 만화입문서 무료배포!\n#합격자수1위 #에듀윌 #공인중개사',
        company: 'EDUWILL>NET',
        text: '입문교재 선착순 무료신청\n합격자 수 1위 에듀월 공인중개사',
        img: '../images/game-1.jpg'
    },
    {
        id: 'M005', // 식별 ID(유티크한 ID) key
        icon: '../images/edu_icon.png',
        title: '에듀윌 5',
        label:  '🚨기간한정 특별 이벤트 1🚨\n초시생 필수템, 만화입문서 무료배포!\n#합격자수1위 #에듀윌 #공인중개사',
        company: 'EDUWILL>NET',
        text: '입문교재 선착순 무료신청\n합격자 수 1위 에듀월 공인중개사',
        img: '../images/game-2.jpg'
    }
]

const request = {
    mainlist: function() {
        return mains;
    }
}