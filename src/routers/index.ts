import { cloneDeep } from 'lodash-es';
import { RouteProps } from './type.d'

export { baseRoutes } from './routes'
export { default as renderRoutes } from './renderRoutes'

export const reCascaderNode = (nodeList: RouteProps[], parentPath = ''): RouteProps[] => {
  const arr: RouteProps[] = [];
  nodeList.forEach(node => {
    const item = node;
    item.path = `${parentPath}/${item.path}`.replace(/\/+/g, '/');
    if (item.routes) {
      arr.push(...reCascaderNode(item.routes, item.path));
    }
    arr.push(item);
  });
  return arr;
};

export const getRoutesData = (routers: RouteProps[]) => {
  let routesArray: RouteProps[] = [];
  routers.forEach((route: RouteProps) => {
    if (route.routes) {
      const routeItem = cloneDeep(route);
      routesArray.push(...reCascaderNode(routeItem.routes!, route.path));
      if (route.component) {
        delete routeItem.routes
        routesArray.push(routeItem)
      }
    } else {
      routesArray.push(route);
    }
  });
  return routesArray;
};
