import * as React from 'react';
import cn from 'classnames';
import useOnClickOutside from 'use-onclickoutside';

interface BaseProps {
  className?: string;
  children: React.ReactNode;
}

const DropdownContext = React.createContext({
  isOpen: false,
  toggleIsOpen: () => {},
});

interface DropdownProps extends BaseProps {
  startOpen?: boolean;
}
export const Dropdown = ({ className, children, startOpen = false }: DropdownProps) => {
  const [isOpen, setIsOpen] = React.useState(startOpen);
  const ref = React.useRef(null);
  useOnClickOutside(ref, () => setIsOpen(false));

  return (
    <DropdownContext.Provider
      value={{
        isOpen,
        toggleIsOpen: () => {
          setIsOpen(!isOpen);
        },
      }}
    >
      <div ref={ref} className={`md:relative z-50 ${className}`}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

interface DropdownLabelProps extends BaseProps {}

function Label({ className = '', children }: DropdownLabelProps) {
  const ctx = React.useContext(DropdownContext);

  const labelClasses = cn('cursor-pointer', className);

  return (
    <span className={labelClasses} onClick={() => ctx.toggleIsOpen()}>
      {children}
    </span>
  );
}

Dropdown.Label = Label;

interface DropdownMenuProps extends BaseProps {}
function Menu({ className = '', children }: DropdownMenuProps) {
  const ctx = React.useContext(DropdownContext);

  const menuClasses = cn(
    'absolute mx-4 md:mx-0 w- left-0 right-0 md:left-auto bg-black rounded py-4',
    {
      hidden: ctx.isOpen === false,
      block: ctx.isOpen,
    },
    className
  );
  return <div className={menuClasses}>{children}</div>;
}

Dropdown.Menu = Menu;

interface DropdownMenuItemProps extends BaseProps {
  onClick?: Function;
}
function MenuItem({ children, onClick }: DropdownMenuItemProps) {
  const ctx = React.useContext(DropdownContext);
  const menuItemClasses = cn('hover:bg-white hover:text-black cursor-pointer px-4 py-2');
  return (
    <div
      className={menuItemClasses}
      onClick={() => {
        if (typeof onClick === 'function') {
          onClick();
        }
        ctx.toggleIsOpen();
      }}
    >
      {children}
    </div>
  );
}

Dropdown.MenuItem = MenuItem;
