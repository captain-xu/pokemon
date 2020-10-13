import React, { FC, useEffect, useMemo, useState } from 'react';
import { Col, Row } from 'antd';
import { getProjectList } from 'apis/project';
import { CardAdd, CardItem } from 'components/CustomCard';
import AddProjectModal from './components/add-project-modal';

const Psyduck: FC = () => {
  const [projectList, setProjectList] = useState([])
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    const fetchData = () => {
      getProjectList().then(res => {
        setProjectList(res?.project_list || [])
      }).catch(err => {

      })
    }
    fetchData()
  }, [modalVisible]);

  return useMemo(() => (
    <div>
      <Row gutter={24}>
        <Col span={6}>
          <CardAdd onAdd={() => {setModalVisible(true)}} title="添加项目" />
        </Col>
        {projectList.map(
          (item: any) => (
            <Col span={6} key={item.project_id}>
              <CardItem
                title={item.project_name}
              >
              </CardItem>
            </Col>
          )
        )}
      </Row>
      <AddProjectModal visible={modalVisible} hideModal={() => {setModalVisible(false)}} />
    </div>
  ), [projectList, modalVisible])
};

export default Psyduck