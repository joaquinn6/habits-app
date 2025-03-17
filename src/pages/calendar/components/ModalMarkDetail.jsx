import { Modal, Form, Input, Button, Row, Col, InputNumber } from "antd";
import { MinusOutlined, PlusOutlined } from "@icons";
import markStore from "@/stores/mark.store";
import PropTypes from "prop-types";
import { runes } from "runes2";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import habitStore from "@/stores/habit.store";

dayjs.extend(utc);
const ModalMarkDetail = ({ isOpen, onClose, mark, date }) => {
  const [form] = Form.useForm();
  const { updateMark, createMark, deleteMark } = markStore();
  const { entity } = habitStore();
  useEffect(() => {
    form.setFieldsValue({
      times: mark.times || 0,
      note: mark.note || "",
    });
  }, [mark, form]);

  const onFinish = () => {
    const values = form.getFieldsValue();
    if (!mark._id && values.times > 0)
      createMark(entity._id, {
        date: date.utc().startOf("day").toISOString(),
        times: values.times,
        note: values.note,
      });

    if (mark._id && values.times == 0) deleteMark(mark._id);

    if (mark._id && values.times > 0)
      updateMark(mark._id, {
        times: values.times,
        note: values.note,
        date: date.utc().startOf("day").toISOString(),
      });

    onClose();
  };

  return (
    <Modal
      title="Marcador"
      open={isOpen}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancelar
        </Button>,
        <Button key="submit" type="primary" onClick={onFinish}>
          {mark._id && form.getFieldValue("times") == 0
            ? "Eliminar"
            : "Guardar"}
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Row justify="center">
          <Button
            type="primary"
            icon={<MinusOutlined />}
            size="large"
            onClick={() =>
              form.setFieldValue(
                "times",
                form.getFieldValue("times") >= 1
                  ? form.getFieldValue("times") - 1
                  : 0
              )
            }
          />

          <Form.Item name="times">
            <InputNumber
              min={0}
              style={{ width: "50px" }}
              variant="borderless"
              disabled
            />
          </Form.Item>

          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            onClick={() =>
              form.setFieldValue("times", form.getFieldValue("times") + 1)
            }
          />
        </Row>
        <Row justify="center">
          <Col
            xs={{ flex: "100%" }}
            sm={{ flex: "100%" }}
            md={{ flex: "100%" }}
            lg={{ flex: "100%" }}
            xl={{ flex: "100%" }}
          >
            <Form.Item name="note">
              <Input.TextArea
                placeholder="Nota"
                autoSize={{ minRows: 3, maxRows: 5 }}
                count={{
                  show: true,
                  max: 60,
                  strategy: (txt) => runes(txt).length,
                  exceedFormatter: (txt, { max }) =>
                    runes(txt).slice(0, max).join(""),
                }}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

ModalMarkDetail.propTypes = {
  isOpen: PropTypes.node.isRequired,
  onClose: PropTypes.node.isRequired,
  mark: PropTypes.object.isRequired,
  date: PropTypes.any.isRequired,
};
export default ModalMarkDetail;
