import DatePicker from 'react-datepicker';
import { useState } from 'react';
import { Button, Modal, Select, Checkbox } from 'antd';
import {
  ReservationStatus,
  translateStatus,
} from '../../interfaces/reservation.status';

const { Option } = Select;

interface Props {
  open: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  applyFilters: (
    startDate: Date | null,
    endDate: Date | null,
    status: ReservationStatus | null,
  ) => void;
  resetFilters: () => void;
}

export const ModalReservationsFilters = (props: Props) => {
  const [startDate, setStartDate] = useState<null | Date>(new Date());
  const [endDate, setEndDate] = useState<null | Date>(null);
  const [selectedStatus, setSelectedStatus] =
    useState<ReservationStatus | null>(null);
  const [considerDates, setConsiderDates] = useState(true);

  const onChangeDate = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const handleStatusChange = (value: ReservationStatus) => {
    setSelectedStatus(value);
  };

  const resetFilters = () => {
    setStartDate(new Date());
    setEndDate(null);
    setSelectedStatus(null);
    setConsiderDates(true);
    props.resetFilters();
  };

  return (
    <Modal
      open={props.open}
      footer={null}
      onCancel={() => {
        props.setModalOpen(false);
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h3 style={{ marginBottom: '40px' }}>Filters</h3>
        <Checkbox
          checked={considerDates}
          onChange={(e) => {
            const result = e.target.checked;
            setStartDate(null);
            setEndDate(null);
            setConsiderDates(e.target.checked);
          }}
          style={{ marginBottom: '10px' }}
        >
          Filtro de fechas
        </Checkbox>
        {considerDates && (
          <DatePicker
            selected={startDate}
            onChange={onChangeDate}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
          />
        )}
        <Select
          style={{ width: 200, marginTop: 20 }}
          placeholder="Selecciona un status"
          onChange={handleStatusChange}
          value={selectedStatus}
        >
          {Object.values(ReservationStatus).map((status) => (
            <Option key={status} value={status}>
              {translateStatus(status)}
            </Option>
          ))}
        </Select>
        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-around',
            marginTop: '40px',
          }}
        >
          <Button danger type="primary" onClick={resetFilters}>
            Resetear
          </Button>
          <Button
            type="primary"
            onClick={() => {
              props.applyFilters(startDate, endDate, selectedStatus);
            }}
          >
            Aplicar
          </Button>
        </div>
      </div>
    </Modal>
  );
};
