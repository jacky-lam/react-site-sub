import React, { ReactNode, useEffect, useRef } from 'react';
import { cx, css } from 'emotion';

import theme from 'common/theme';

const fullScreenModalStyle = css`
    position: fixed;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    z-index: ${theme.zindex.popupModalBase};
    overflow: hidden;
`;

const fixedModalBaseStyle = css`
    position: fixed;
    width: auto;
    height: auto;
    z-index: ${theme.zindex.popupModalBase};
    border-radius: 3px;
`;

const absoluteModalBaseStyle = css`
    position: absolute;
    width: auto;
    height: auto;
    z-index: ${theme.zindex.popupModalBase};
    border-radius: 3px;
`;

const overlayStyle = css`
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(${theme.color.overlayBackgroundRgba});
    z-index: ${theme.zindex.popupModalBase};
    height: 100%;
    width: 100%;
    overflow: auto;
`;

const overlayCenterStyle = css`
    ${overlayStyle};
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const closeModalButtonStyle = css`
    position: absolute;
    right: 0px;
    top: 0px;
    cursor: pointer;
    background-color: transparent;
    padding: ${theme.spacing.sm}px;
    font-size: ${theme.font.normalTextSize}px;
    color: ${theme.color.errorActiveText};
`;

type ModalType = 'FULL' | 'FIXED' | 'ABSOLUTE' | 'CENTER';

type PopupModalProps = {
    children: ReactNode;
    onClickOutsideModal?: () => void;
    modalType?: ModalType;
    positionTop?: string; // only for ABSOLUTE | FIXED
    positionLeft?: string; // only for ABSOLUTE | FIXED
    positionRight?: string; // only for ABSOLUTE | FIXED
    positionBottom?: string; // only for ABSOLUTE | FIXED
    addOverlay?: boolean; // only for ABSOLUTE | FIXED
};

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(ref: any, onClickOverlay: any) {
    useEffect(() => {
        console.log('adding mousedown-listener');
        function handleClickOutside(event: any) {
            if (ref.current && !ref.current.contains(event.target)) {
                console.log('click outside popupmodal');
                onClickOverlay();
            }
        }

        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener('mousedown', handleClickOutside);
            console.log('removing mousedown-listener');
        };
    }, [ref]);
}

const PopupModal: React.FunctionComponent<PopupModalProps> = ({
    children,
    onClickOutsideModal,
    modalType = 'FULL',
    positionTop,
    positionLeft,
    positionRight,
    positionBottom,
    addOverlay = false,
}) => {
    console.log('Rendering PopupModal...');

    let modalProps: any = {};
    switch (modalType) {
        case 'FULL':
            modalProps.className = fullScreenModalStyle;
            break;
        case 'FIXED':
            modalProps.className = cx(
                fixedModalBaseStyle,
                css`
                    ${positionTop != undefined
                        ? 'top: ' + positionTop + '; '
                        : ''}
                    ${positionBottom != undefined
                        ? 'bottom: ' + positionBottom + '; '
                        : ''}
                    ${positionLeft != undefined
                        ? 'left: ' + positionLeft + '; '
                        : ''}
                    ${positionRight != undefined
                        ? 'right: ' + positionRight + '; '
                        : ''}
                `,
            );
            break;
        case 'ABSOLUTE':
            modalProps.className = cx(
                absoluteModalBaseStyle,
                css`
                    ${positionTop != undefined
                        ? 'top: ' + positionTop + '; '
                        : ''}
                    ${positionBottom != undefined
                        ? 'bottom: ' + positionBottom + '; '
                        : ''}
                    ${positionLeft != undefined
                        ? 'left: ' + positionLeft + '; '
                        : ''}
                    ${positionRight != undefined
                        ? 'right: ' + positionRight + '; '
                        : ''}
                `,
            );
            break;
    }

    const wrapperRef = useRef(null);
    if (onClickOutsideModal) useOutsideAlerter(wrapperRef, onClickOutsideModal);

    const popupElement = (
        <div
            {...modalProps}
            onClick={(event: React.MouseEvent<HTMLElement>) => {
                event.stopPropagation();
            }}
            ref={wrapperRef}
        >
            {children}
        </div>
    );

    return addOverlay || modalType == 'CENTER' ? (
        <div
            className={cx(
                modalType == 'CENTER' ? overlayCenterStyle : overlayStyle,
            )}
        >
            {popupElement}
        </div>
    ) : (
        popupElement
    );
};

export default PopupModal;
