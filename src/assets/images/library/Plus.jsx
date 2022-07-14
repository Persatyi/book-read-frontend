export default function Plus({onClick}) {
   const plusIcon = {
      position: 'absolute',
      bottom: '12px',
      cursor: 'pointer',
      marginLeft: 'auto',
      marginRight: 'auto',
      left: 0,
      right: 0,
   }
   return (
   <svg onClick={onClick} style={plusIcon} width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="26" cy="26" r="26" fill="#FF6B08"/>
<path d="M33.1999 25.2H26.8V18.7999C26.8 18.3584 26.4416 18 25.9999 18C25.5584 18 25.2 18.3584 25.2 18.7999V25.2H18.7999C18.3584 25.2 18 25.5584 18 25.9999C18 26.4416 18.3584 26.8 18.7999 26.8H25.2V33.1999C25.2 33.6416 25.5584 34 25.9999 34C26.4416 34 26.8 33.6416 26.8 33.1999V26.8H33.1999C33.6416 26.8 34 26.4416 34 25.9999C34 25.5584 33.6416 25.2 33.1999 25.2Z" fill="white"/>
</svg>
   )
};
