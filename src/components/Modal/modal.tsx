import React, { PropsWithChildren, useMemo, ReactNode, CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import Button from '../Button';
import Icon from '../Icon';
import useStopScroll from '../../hooks/useStopScroll';
import Transition from '../Transition';


interface ModalType{
    /** 父组件用来控制的状态 */
    visible?:boolean;
     /** 容器位置 */
    container?:Element;
    /** 父组件用来改变显示状态的setState*/
    setState:React.Dispatch<React.SetStateAction<boolean>>;
    /** 弹出框标题 */
    title?:ReactNode;
     /** 是否有确认按钮 */
    confirm?:boolean;
    /** 改变确认按钮文本*/
    okText?:string;
    /** 改变取消按钮文本*/
    cancelText?:string;
    /** 点了确认的回调，如果传了，需要自行处理关闭 */
    onOk?:()=>void;
    /** 点了取消的回调，如果传了，需要自行处理关闭*/
    onCancel?:()=>void;
    /** 点确认或者取消都会走的回调 */
    callback?:(v:boolean)=>void;
    /** 点击mask是否关闭模态框 */
    maskClose?:boolean;
    /** 是否有mask */
    mask?:boolean;
    /** 自定义模态框位置 */
    style?:CSSProperties;
    /** 是否有右上角关闭按钮 */
    closeButton?:boolean;
    /** 动画时间 */
    delay:number;
}

function Modal(props:PropsWithChildren<ModalType>){
    const {visible,maskClose,closeButton,delay,mask,container,confirm,okText,style,cancelText,onOk,onCancel,callback,title,setState}=props
    const render =useMemo(()=>{
        return  createPortal( 
                <Transition in={visible} timeout={delay} classNames={'bigbear-modal-animation'}>
                <div className={`bigbear-modal-potral ${visible?'open':''}`} >
                    <div className='bigbear-modal-viewport' style={style}> 
            
                        <div className='bigbear-modal-title'>{title&&title}
                        {closeButton&&<div className='bigbear-modal-closebtn'>
                            <Button onClick={()=>setState(false)}>
                                <Icon icon='times'></Icon>
                            </Button>
                            </div>}
                        </div>
                        {props.children&&<div className='bigbear-modal-children'>
                            {props.children}</div>
                        }
                        {
                            confirm&&<div className='bigbear-modal-confirm'>
                                <Button onClick={()=>{onOk?onOk():setState(false);if(callback)callback(true)}}>{okText?okText:'确认'}</Button>
                                <Button  onClick={()=>{onCancel?onCancel():setState(false);if(callback)callback(false)}}>{cancelText?cancelText:'取消'}</Button>
                            </div>
                        }
                    </div>
                    {
                        mask&& <div className='bigbear-modal-mask' onClick={()=>{if(maskClose)setState(false)}}></div>
                    }
                   
                </div>
                </Transition>
            ,container!
        )
    },[callback, cancelText, closeButton, confirm, container, delay, mask, maskClose, okText, onCancel, onOk, props.children, setState, style, title, visible])
    useStopScroll(visible!,300)
    
    return(
            <div className='bigbear-modal-wrapper' >
               {render}
            </div>
    )
}

Modal.defaultProps={
    visible:false,
    container:window.document.body,
    confirm:true,
    title:'标题',
    maskClose:true,
    mask:true,
    closeButton:true,
    delay:300

}

export default Modal;




