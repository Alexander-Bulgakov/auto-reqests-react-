import React from 'react';
import { useNavigate } from 'react-router-dom';
import { myStore } from '../store/MyStore.store';
import Cloud from '../icons/Cloud.svg';
import Success from '../icons/Success.svg';
import Sync from '../icons/Sync.svg';

const statusObj: any = {
  "SUCCESS": {
    img: Success,
    description: "Успех",
    link: "/SUCCESS"
  },
  "DRAFT": {
    img: Cloud,
    description: "Черновик",
    link: "/DRAFT"
  },
  "PROCESSING": {
    img: Sync,
    description: "В обработке",
    link: "/Loading"
  }
}
const ListItem = ({ code, id, brand, model, date }: any): JSX.Element => {

  const navigate = useNavigate();

  const handleClick = () => {    
    myStore.setRequestId(id);
    if (code === "SUCCESS") {
      myStore.setSuccessObject(id, brand, model, date);
    }
    navigate(statusObj[code].link);
  }

  return (
    <div className="requests-list__item" style={{ textDecoration: 'none' }} onClick={handleClick}>
      <div className="requests-list__icon-container">
        <img src={statusObj[code].img} className="requests-list__icon"/>
      </div>
      <div className="requests-list__text">
        <h4 className="header">
          Заявка №{id} на автомобиль {brand} {model}
        </h4>
        <p className="description">Статус: {statusObj[code].description}</p>
        <p className="description">Дата: {new Date(date).toLocaleDateString()}</p>
      </div>
    </div>
  )
}

export default ListItem;