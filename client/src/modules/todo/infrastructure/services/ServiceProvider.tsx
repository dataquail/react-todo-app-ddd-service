import { createContext, useContext, ReactNode } from 'react';

import { IActiveTodoService } from '../../domain/services/IActiveTodoService';
import { useActiveTodoServiceDI } from './ActiveTodoService/DI';

export type IServiceContext = {
  activeTodoService: IActiveTodoService;
};

const ServiceContext = createContext<IServiceContext>({} as IServiceContext);

type ServiceProps = {
  children: ReactNode;
};

const useServiceProvider = () => {
  return useContext(ServiceContext);
};

export const ServiceProvider = ({ children }: ServiceProps) => {
  return (
    <ServiceContext.Provider
      value={{
        activeTodoService: useActiveTodoServiceDI(),
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};

export const useActiveTodoService = () => {
  return useServiceProvider().activeTodoService;
};
