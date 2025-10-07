"use client"

export default function VerticalPill({ text }) {
  return (
    <div
      className="shadow-sm border"
      style={{
        background: '#F8F8FF',
        borderColor: '#EAEAF5',
        borderRadius: '29px',
        padding: '6px   ',
        width: 'clamp(152px, 6vw, 110px)',
        height: 'clamp(-1px, 3.5vw, 47px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: 'rotate(90deg)',
        margin: '8px 0',
        whiteSpace: 'nowrap'
      }}
    >
      <span
        style={{
          fontFamily: 'Poppins, Inter, system-ui, sans-serif',
          fontWeight: 400,
          fontSize: 'clamp(10px, 1.2vw, 12px)',
          lineHeight: '16px',
          color: '#615E83',
          whiteSpace: 'nowrap',
        }}
      >
        {text}
      </span>
    </div>
  )
}


