import { Lock, Unlock, TrendingDown, TrendingUp} from "react-feather"

interface DataProps {
    title: string,
    icon: string,
    value: string,
    valueColor?: string
  }

const OverviewCard = ( props: DataProps) => {

    const {
        title,
        icon,
        value,
        valueColor
    } = props

  return (
    <div
      style={{
        boxSizing: "border-box",
        width: '100%',
        height: '100px',
        background: "#1B2131",
        border: "0.5px solid rgba(113, 206, 255, 0.5)",
        borderRadius: '8px',
      }}
    >
        <div
            style={{
                position: 'relative',
                left: '9.13%',
                top: '50%',
                width: '64px',
                height: '64px',
                background: '#474747',
                borderRadius: '50%',
                transform: 'translateY(-50%)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            {
                icon === 'unlock' ? <Unlock color="#71CEFF"/> :
                icon === 'lock' ? <Lock color="#D5B4FF"/> :
                icon === 'up' ? <TrendingUp color="#5FD0AB"/> :
                icon === 'down' ? <TrendingDown color="#FF648A"/> :
                null
            }
        </div>
        <div
            style={{
                position: 'relative',
                left: '100px',
                top: '-36px',
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '17px',
                color: '#C4C4C4'
            }}
        >
            {title}
        </div>
        <div
            style={{
                position: 'relative',
                left: '100px',
                top: '-30px',
                fontFamily: 'Roboto Mono',
                fontStyle: 'normal',
                fontWeight: 700,
                fontSize: '18px',
                lineHeight: '24px',
                color: `${valueColor ?? '#E5F6FF'}`,
            }}
        >
            {value}
        </div>
    </div>
  );
};

export default OverviewCard;