# new-blog-server-prototype

## passport와 google-oauth를 사용했을 때 구글이 발급해주는 accessToken을 사용하지 않는 이유

Google과 느슨한 연결을 만들기 위함이다. 구글의 accessToken을 사용하면 유저의 인증 주기 등을 자유롭게할 수 없고, 만약 구글의 인증 방식이 바뀐다면 혹은 구글이 아닌 다른 provider를 사용하게 된다면 바꾸어야할 코드가 많아진다.

따라서 구글을 통해 로그인 하되, accessToken, refreshToken은 별도로 발급한다.
