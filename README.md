# 머글래 웹 모듈 제작 Repo입니다.

#### version 관리

1.0.0 - 중대한 변화가 있는 경우
1.1.0 - 고도화 작업 완료 시
1.1.1 - 유의미한 기능 변화가 있을 시

버그 수정은 version_hotfix로 간단하게 처리
초기 버전 기능 추가에 따른 버전 업그레이드는 불필요



### 1. 머글래 리뷰 영상 공유하기

[GET] /api/public/business/shop/video/info

- 만족도 : visit_satisfaction
  - 1 : 만족해요
  - 2 : 보통이에요
  - 3 : 아쉬워요


- 프로필 이미지 : profile_filename(.jpg)
- 유저이름 : nickname
- 시간계산 : created_time
- 가게주소 : address_place_name


- 내용 : short_content


- 영상 : filename(.m3u8)
- 썸네일 : video_thumbnail(jpg)


- 가게 이미지 : shop_filename(.jpeg)
- 가게이름 : name
- 네이버 url : naver_map_place_id



### 2. 머글래 커뮤니티

[GET] /api/public/community/list

- pageParam 최초값은 0(초기 데이터 확보)
- lastUid는 가져온 데이터의 마지막 데이터의 uid
- 사용 변수는 단일 리뷰와 동일(리스트 형태 / 12 posts in 1 array)

