import axios from "axios";

const publicApiRoute = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });


  const privateApiRoute = axios.create({
    baseURL: process.env.REACT_APP_CHATHISTORY_API,
  });
  
  privateApiRoute.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem("access_token");
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  privateApiRoute.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
  
      // Проверяем статус ошибки 401
      if (error.response && error.response.data.detail === "Invalid token or expired token." && !originalRequest._retry) {
        originalRequest._retry = true;
  
        try {
          const refreshToken = localStorage.getItem("refresh_token");
  
          // Запрос на обновление токена
          const response = await publicApiRoute.post(`refresh/token`, {},
            { 
              headers: { 
                'Authorization': `Bearer ${refreshToken}` 
              } 
            });
  
          const { access_token } = response.data;
  
          // Сохраняем новый токен
          localStorage.setItem("access_token", access_token);
  
          // Обновляем заголовок авторизации в оригинальном запросе
          originalRequest.headers.Authorization = `Bearer ${access_token}`;
  
          // Повторяем оригинальный запрос
          return privateApiRoute(originalRequest);
        } catch (refreshError) {
          destroyToken(); // Если не удалось обновить токен, вызываем функцию уничтожения токена
          return Promise.reject(refreshError);
        }
      }
      
      return Promise.reject(error);
    }
  );
  
  // Функция для уничтожения токена
  function destroyToken(navigate) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("roles")
    localStorage.removeItem("userId")
    
    if(navigate){
        navigate("/")
    }
  }

  export { publicApiRoute, privateApiRoute, destroyToken }