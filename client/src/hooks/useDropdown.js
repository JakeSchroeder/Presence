import React, { useEffect } from "react";
import styled from "styled-components";
import usePortal from "react-useportal";

const StyledDropdown = styled.div`
  /* box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  padding: 20px;
  display: flex;
  flex-direction: column; */
`;

const Background = styled.div`
  position: absolute;
  background: transparent;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 1000;
`;

export const useDropdown = ({
  onOpen,
  // onClose,
  openTop,
  openLeft,
  openRight,
  openDelete,
  openCenter,
  openBottom,
  ...config
}) => {
  const root = document.getElementById("root");
  const { isOpen, togglePortal, Portal, ref: targetRef, portalRef } = usePortal(
    {
      onOpen(args) {
        root.style = "pointer-events: none";
        const { portal, targetEl } = args;
        console.log(portalRef.current);
        const clickedEl = targetEl.current;
        const {
          top,
          bottom,
          left,
          right,
          height,
          width,
        } = clickedEl.getBoundingClientRect();

        let t = 0;
        let b = 0;
        let r = 0;
        let l = 0;

        if (openLeft && openBottom) {
          t = top + clickedEl.clientHeight;
          l = left;
          portal.current.style.cssText = `
        
          position: absolute;
          top: ${t - 30}px;
          left: ${l - 200}px;
          background: #ffff;
              `;
        }

        if (openDelete) {
          t = top + clickedEl.clientHeight;
          l = left;
          portal.current.style.cssText = `
        
          position: absolute;
          top: ${t - 30}px;
          left: ${l - 80}px;
          background: #ffff;
              `;
        }

        if ((openCenter, openTop)) {
          t = top - 141 - 10;
          l = right - width / 2 - 150;

          portal.current.style.cssText = `
        
          position: absolute;
          top: ${t}px;
          left: ${l}px;
          background: #ffff;
              `;
        }

        // let l = left;
        // let t = top + clickedEl.clientHeight;
        // const outRight = window.innerWidth < left + clickedEl.offsetWidth;
        // // const outBottom =
        // //   window.innerHeight < top + portal.current.clientHeight;
        // const outTop = window.innerHeight > top + portal.current.offsetHeight;
        // console.log(outTop);
        // const outLeft = false;
        // if (outRight) {
        //   l = window.innerWidth - (right - left + clickedEl.offsetWidth);
        // } else if (outLeft) {
        //   /* very uncommon, implement later */
        // }
        // if () {
        //   t = window.innerHeight - (bottom - top + height);
        // } else
        // if (outTop) {
        //   /* very uncommon, implement later */
        //   t = window.innerHeight - height;
        // }

        if (onOpen) onOpen(args);
      },
      onScroll({ portal }) {
        // console.log("SCROLLING");
        // TODO: add logic so when scrolling, the portal doesn't get displaced
      },
      onResize() {},
      onClose() {
        root.removeAttribute("style");
      },
      ...config,
    }
  );

  // const onResize = ({ target: screen }) => {
  //   const { left, right } = targetRef.current.getBoundingClientRect()
  //   const l = screen.innerWidth - (right - left + width)
  //   portalRef.current.style.left = `${l}px`
  // }

  const Dropdown = (props) => (
    <Portal>
      <StyledDropdown {...props} />
    </Portal>
  );

  return Object.assign([togglePortal, isOpen, Dropdown], {
    Dropdown,
    toggleDropdown: togglePortal,
    isDropdownOpen: isOpen,
  });
};
