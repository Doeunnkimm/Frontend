import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { pageMountAnimation } from '../Routes/routing.style';

function Sub() {
  const navigate = useNavigate();
  return (
    <motion.div {...pageMountAnimation}>
      <h1>서브 페이지</h1>
      <button onClick={() => navigate('/')}>메인 페이지로 이동</button>
      <div>
        <img
          src="https://pbs.twimg.com/media/FjN1ebDaAAE8oA5?format=jpg&name=large"
          alt=""
          width={'50%'}
        />
      </div>
    </motion.div>
  );
}
export default Sub;
