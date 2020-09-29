export interface RouteProps {
  key: string;
  exact?: boolean;
  redirect?: string;
  path?: string;
  title?: string;
  component?: React.ComponentType;
  routes?: RouteProps[];
}