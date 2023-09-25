import { useSelector } from 'react-redux';
import { REACT_APP_BASE_URL } from '../../../../env';
import { ReservationService } from '../../../services/reservation.service';
import { ReservationList } from '../../../components/ReservationList/ReservationList';
import { withPageLayout } from '../../../wrappers/WithPageLayout';

const reservationService = new ReservationService(REACT_APP_BASE_URL);
export const BusinessReservations = withPageLayout(
  () => {
    const businessId = useSelector(
      (state: any) => state.business.currentBusiness.id,
    );

    const getReservationsByBusinessId = (
      id,
      options,
      searchTerm,
      start,
      end,
      status,
    ) => {
      return reservationService.getReservationsByBusinessId(
        id,
        options,
        searchTerm,
        start,
        end,
        status,
      );
    };

    return (
      <ReservationList
        id={businessId}
        isBusiness={true}
        getReservationsBy={getReservationsByBusinessId}
      />
    );
  },
  '0px',
  true,
  true,
);
