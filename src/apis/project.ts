import { request } from 'utils/request';

// 获取项目列表
export function getProjectList(args = {}) {
  return request({
    url: `/api/project`,
    method: 'GET',
    data: args
  })
}

// 新增项目
export function addProject(args = {}) {
  return request({
    url: `/api/project`,
    method: 'POST',
    data: args
  })
}