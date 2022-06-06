import React, { useEffect } from 'react';
import { PageHeader, Col, Row, Descriptions, Typography } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actions, Types } from '../state';
import useFetchInfo from '../../common/hook/useFetchInfo';
import Department from './Department';
import TagList from './TagList';
import History from '../../common/component/History';
import FetchLabel from '../component/FetchLabel';
import useNeedLogin from '../../common/hook/useNeedLogin';

export default function User() {
  useNeedLogin();
  const history = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const userHistory = useSelector(state => state.user.userHistory);

  const { name } = useParams();
  useEffect(() => {
    dispatch(actions.fetchUser(name));
    dispatch(actions.fetchUserHistory(name));
  }, [dispatch, name]);
  console.log(name);

  //const isFetched = true;
  const { isFetched } = useFetchInfo(Types.FetchUser);

  return (
    <Row justify="center">
      <Col xs={24} md={20} lg={14}>
        <PageHeader
          onBack={() => { history(-1) }}
          title={
            <FetchLabel label="사용자 정보" actionType={Types.FetchUser} />
            // <Space>
            //   사용자 정보
            //   { isSlow && <Spin size="small" />}
            // </Space>
          }
        >
          {user && (
            <Descriptions layout="vertical" bordered column={1}>
              <Descriptions.Item label="이름">
                <Typography.Text>{user.name}</Typography.Text>
              </Descriptions.Item>
              <Descriptions.Item 
                label={
                  <FetchLabel 
                    label="소속" 
                    actionType={Types.FetchUpdateUser}
                    fetchKey="department" 
                  />
                }
              >
                <Department />
              </Descriptions.Item>
              <Descriptions.Item 
                label={
                  <FetchLabel 
                    label="태그" 
                    actionType={Types.FetchUpdateUser}
                    fetchKey="tag" 
                  />
                }
              >
                <TagList />
              </Descriptions.Item>
              <Descriptions.Item label="수정 내역">
                <History items={userHistory} />
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
