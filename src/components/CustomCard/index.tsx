import React from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';

import './index.less'

interface CardAddProps {
  title?: string
  onAdd?: () => void
}

export const CardAdd = (props: CardAddProps) => {
  const {
    title = '',
    onAdd = () => {}
  } = props;

  return (
    <section onClick={() => onAdd()} className="card-item card-add">
      <PlusCircleOutlined style={{fontSize: 40, marginBottom: 10}} />
      <span>{title || '添加'}</span>
    </section>
  );
}

interface CardItemProps {
  title: string
  children: React.ReactNode | string;
  footer?: React.ReactNode | string;
}

export const CardItem = (props: CardItemProps) => {
  const {
    title,
    children,
    footer,
  } = props;

  return (
    <section className="card-item">
      <div className="card-item-header">
        <div className="card-item-title">{title}</div>
      </div>
      <div className="card-item-content">
        {children}
      </div>
      {footer && (
        <div className="card-item-operator">
          {footer}
        </div>
      )}
    </section>
  );
}
