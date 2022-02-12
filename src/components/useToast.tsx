import { Position, Toaster, ToastProps } from '@blueprintjs/core';

/** Singleton toaster instance. Create separate instances for different options. */
export const AppToaster =
  typeof document !== 'undefined'
    ? Toaster.create({
        className: 'toaster z-[3000]',
        position: Position.BOTTOM,
        maxToasts: 3,
        canEscapeKeyClear: true,
        autoFocus: false,
      })
    : null;

function useToast() {
  const showToast = (props: ToastProps) => {
    // create toasts in response to interactions.
    // in most cases, it's enough to simply create and forget (thanks to timeout).
    AppToaster.show({ ...props, timeout: 1500 });
    return;
  };

  return { showToast };
}

export default useToast;
