import { reactive, watch, nextTick } from "vue";
import { isObj } from "../utils";

interface ITransitionProps {
  show: boolean;
  duration: any;
  name: string;
}

const getClassNames = (name: string) => ({
  enter: `van-${name}-enter van-${name}-enter-active enter-class enter-active-class`,
  "enter-to": `van-${name}-enter-to van-${name}-enter-active enter-to-class enter-active-class`,
  leave: `van-${name}-leave van-${name}-leave-active leave-class leave-active-class`,
  "leave-to": `van-${name}-leave-to van-${name}-leave-active leave-to-class leave-active-class`
});

export default function useTransition(props: ITransitionProps, emit: (evt: string, args?: any) => void) {
  //
  watch(
    () => props.show,
    (v) => {
      v ? enter() : leave();
    }
  );

  //
  const state = reactive({
    type: "",
    inited: false,
    display: false,
    status: "",
    classes: "",
    currentDuration: ""
  });

  //
  let transitionEnded = false;

  //
  function enter() {
    const { duration, name } = props;
    const classNames = getClassNames(name);
    const currentDuration = isObj(duration) ? duration.enter : duration;

    state.status = "enter";
    emit("before-enter");

    Promise.resolve()
      //@ts-ignore
      .then(nextTick)
      .then(() => {
        checkStatus("enter");
        emit("enter");
        state.inited = true;
        state.display = true;
        state.classes = classNames.enter;
        state.currentDuration = currentDuration;
      })
      //@ts-ignore
      .then(nextTick)
      .then(() => {
        checkStatus("enter");
        transitionEnded = false;
        state.classes = classNames["enter-to"];
      })
      .catch((e) => {
        console.error(e);
      });
  }

  //
  function leave() {
    if (!state.display) {
      return;
    }
    const { duration, name } = props;
    const classNames = getClassNames(name);
    const currentDuration = isObj(duration) ? duration.leave : duration;

    state.status = "leave";
    emit("before-leave");

    Promise.resolve()
      //@ts-ignore
      .then(nextTick)
      .then(() => {
        checkStatus("leave");
        emit("leave");
        state.classes = classNames.leave;
        state.currentDuration = currentDuration;
      })
      //@ts-ignore
      .then(nextTick)
      .then(() => {
        checkStatus("leave");
        transitionEnded = false;
        setTimeout(() => onTransitionEnd(), currentDuration);
        state.classes = classNames["leave-to"];
      })
      .catch(() => {});
  }

  function checkStatus(status: "enter" | "leave") {
    if (status !== state.status) {
      throw new Error(`incongruent status: ${status}`);
    }
  }

  function onTransitionEnd() {
    if (transitionEnded) {
      return;
    }

    transitionEnded = true;
    emit(`after-${state.status}`);

    if (!props.show && state.display) {
      state.display = false;
    }
  }

  return {
    state,
    enter,
    leave,
    checkStatus,
    onTransitionEnd
  };
}
