import { useParams } from 'react-router-dom';

export default function () {
  const { uuid } = useParams();

  return uuid && <div>virtances</div>;
}
