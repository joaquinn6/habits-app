import { createContext, useContext, useMemo, useCallback } from "react";
import { notification } from "antd";
import PropTypes from "prop-types";

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = useCallback(
    (type, title, description) => {
      api[type]({
        message: title,
        description: description,
      });
    },
    [api]
  );

  const contextValue = useMemo(
    () => ({ openNotification }),
    [openNotification]
  );

  return (
    <NotificationContext.Provider value={contextValue}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};

NotificationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotificationContext debe usarse dentro de un NotificationProvider"
    );
  }
  return context;
};
