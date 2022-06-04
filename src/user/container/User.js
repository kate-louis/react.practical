import React, { useEffect } from 'react';
import { PageHeader, Col, Row, Descriptions, Typography, Space, Spin } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actions, Types } from '../state';
import useFetchInfo from '../../common/hook/useFetchInfo';

export default function User() {
  const history = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);

  const { name } = useParams();
  useEffect(() => {
    dispatch(actions.fetchUser(name));
  }, [dispatch, name]);
  console.log(name);

  //const isFetched = true;
  const { isFetched, isSlow } = useFetchInfo(Types.FetchUser);

  return (
    <Row justify="center">
      <Col xs={24} md={20} lg={14}>
        <PageHeader
          onBack={() => { history(-1) }}
          title={
            <Space>
              사용자 정보
              { isSlow && <Spin size="small" />}
            </Space>
          }
        >
          {user && (
            <Descriptions layout="vertical" bordered column={1}>
              <Descriptions.Item label="이름">
                <Typography.Text>{user.name}</Typography.Text>
              </Descriptions.Item>
              <Descriptions.Item label="소속">
                {user.department}
              </Descriptions.Item>
              <Descriptions.Item label="태그">
                {user.tag}
              </Descriptions.Item>
              <Descriptions.Item label="수정 내역">
                수정 내역
              </Descriptions.Item>
            </Descriptions>
          )}
          {!user && isFetched && (
            <Typography.Text>존재하지 않는 사용자 입니다.</Typography.Text>
          )}
        </PageHeader>
      </Col>
    </Row>
  );
}
