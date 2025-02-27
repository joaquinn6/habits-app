import { Modal, Form, Input, Button } from "antd";
import userStore from "@/stores/user.store";
import PropTypes from "prop-types";
import { useNotificationContext } from "@/context/NotificationContext";

const ModalChangePassword = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();
  const { password, loading, error, putPassword } = userStore();
  const { openNotification } = useNotificationContext();

  useEffect(() => {
    if (password) {
      openNotification(
        "success",
        "Correcto",
        "Usuario actualizado correctamente"
      );
      onClose();
    }
  }, [password, openNotification, onClose]);

  useEffect(() => {
    if (error) {
      openNotification("error", "Error", error);
    }
  }, [error, openNotification]);

  const onFinish = () => {
    const values = form.getFieldsValue();
    putPassword({
      old_password: values.old_password,
      new_password: values.new_password,
    });
  };

  return (
    <Modal
      title="Cambiar Contraseña"
      open={isOpen}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose} disabled={loading}>
          Cancelar
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={onFinish}
        >
          Guardar
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Contraseña actual"
          name="old_password"
          rules={[{ required: true, message: "Ingrese su contraseña actual" }]}
        >
          <Input.Password placeholder="Contraseña actual" />
        </Form.Item>

        <Form.Item
          label="Nueva contraseña"
          name="new_password"
          rules={[{ required: true, message: "Ingrese su nueva contraseña" }]}
        >
          <Input.Password placeholder="Nueva contraseña" />
        </Form.Item>

        <Form.Item
          label="Confirmar nueva contraseña"
          name="confirmPassword"
          dependencies={["new_password"]}
          rules={[
            { required: true, message: "Confirme su nueva contraseña" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("new_password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Las contraseñas no coinciden")
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirmar nueva contraseña" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

ModalChangePassword.propTypes = {
  isOpen: PropTypes.node.isRequired,
  onClose: PropTypes.node.isRequired,
};
export default ModalChangePassword;
