import notFound from '/img/404.webp';
import styles from './ErrorPage.module.scss';
import { useNavigate } from 'react-router-dom';
import { routes } from '@/routes/routes';

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.errPage}>
      <div className={styles.container}>
        <div className={styles.img}>
          <img src={notFound} alt="404" />
        </div>
        <div>
          <div className={styles.text}>
            <p>Oops!</p>
            <p>The page you requested was not found!</p>
          </div>
          <button
            className={styles.btn}
            onClick={() => {
              navigate(routes.home);
            }}
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
