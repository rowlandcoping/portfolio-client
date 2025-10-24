import { useState, useEffect } from 'react';
import { usePostContact } from './useContactApi';
import type { ContactTypes } from '../../types/contactTypes';
import { useUser } from '../../features/profile/useUserApi';
import { useProjects } from '../../features/projects/useProjectsApi';
import { useKeyboardNavStore } from "../../stores/keyboardNavStore";
import { useMobileNavStore } from '../../stores/mobileNavStore';

interface ContactFormProps {
  projectId?: ContactTypes['projectId'];
};

const EMAIL_REGEX = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;


const ContactForm = ({ projectId }: ContactFormProps) => {
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [messageLength, setMessageLength] = useState(0);
    const characterMinimum = 20;
    const characterLimit = 200;
    const mutation = usePostContact();
    
    const focusedIndex = useKeyboardNavStore((s) => s.focusedIndex);
    const setLinkCount = useKeyboardNavStore((s) => s.setLinkCount);
    const setFocusedIndex = useKeyboardNavStore((s) => s.setFocusedIndex);
    const enabled = useKeyboardNavStore((s) => s.enabled);

    const focusWithButtons = useMobileNavStore((s) => s.focusWithButtons);
    const setFocusWithButtons = useMobileNavStore((s) => s.setFocusWithButtons);


    const {
        data: user,
        isError: isUserError,
    } = useUser();

    const {
        data: projects,
        isError,
    } = useProjects();

    const project = projects?.find((p) => Number(p.id) === Number(projectId));
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const payload: ContactTypes = {
            projectId: projectId,
            message,
            name,
            email,
        };
        mutation.mutate(payload);
    };

    useEffect(() => {

        if (enabled) return;

        const pageLinks = Array.from(document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLButtonElement>(
                "input, textarea, .form-button"
        )); 

        const handleFocusChange = (e: FocusEvent) => {
            console.log("listener function firing")
            const target = e.target as HTMLElement;
            if (!(target instanceof HTMLInputElement) && !(target instanceof HTMLTextAreaElement)) return;            
            const index = pageLinks.indexOf(target);
            if (index >= 0) {
                setFocusedIndex(index);
            }
        };

        const t = setTimeout(() => {
            pageLinks.forEach(el =>
                el.addEventListener('focusout', handleFocusChange as EventListener)
            );
        }, 300);
        
        return () => {
            clearTimeout(t);
            document.removeEventListener("focusout", handleFocusChange);
            console.log("focusout listener removed");
        };
        

    }, [setFocusedIndex]);

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email.trim()))
    }, [email])

    useEffect(() => {
        if (message.length > characterLimit) {
            setMessage(message.slice(0, characterLimit));
            setMessageLength(characterLimit);
        } else {
            setMessageLength(message.length);
        }
    }, [message, characterLimit])
    
    useEffect(() => {
        if (!user && !projectId) return;
        const pageLinks = Array.from(document.querySelectorAll<
            HTMLInputElement | 
            HTMLButtonElement |
            HTMLTextAreaElement
            >('input, textarea, .form-button'));        
        setFocusedIndex(0);
        setLinkCount(pageLinks.length-1);
        setTimeout(() => {
        pageLinks[0].focus();
        }, 100);
    }, [user, projectId]);    

    useEffect(() => {
        const pageLinks = Array.from(document.querySelectorAll<
            HTMLInputElement | 
            HTMLButtonElement | 
            HTMLTextAreaElement
            >('input, textarea, .form-button'));
        const current = pageLinks[focusedIndex % pageLinks.length];
        if (current) {
            if (!enabled) {
                if (focusWithButtons) {
                    current.focus();
                    setFocusWithButtons(false)
                }
                return
            }
            current.focus();
        }
    }, [focusedIndex])

    if (!user || !projects) return <p>Loading Form Data...</p>;
    if (isError || isUserError) return <p>Error Loading Form Data...</p>;

    // If submission succeeded, just show the success message
    if (mutation.isSuccess) {
            return (
            <div className="message-center">
                <p>Message sent successfully!</p>
                <p>Press Escape or Back to return.</p>
            </div>
            );
    }

    if (mutation.isError) {
            return (
            <div className="message-center">
                <p>Error Sending Message</p>
                <p>Press Escape or Back to return.</p>
            </div>
            );
    }

    

    // Otherwise show the form
    return (
        <>
            <main aria-describedby={enabled ? 'navigation-instructions' : undefined}>
                {enabled &&(
                    <>
                        <p className="sr-only" id="navigation-instructions">
                            Use up and down arrow keys to cycle between form fields and the submit button.
                            Press Enter on the submit button to submit the form.  Press Escape to go back to the previous page.
                        </p>
                    </>
                )}
                <div className="content">
                    <h1>{project ? 
                        `${project.name} Feedback`                    
                    :
                        `Contact ${user.name}` 
                    }
                    </h1>
                    <form className='search-form' onSubmit={(e) => e.preventDefault()}>
                        <label className="sr-only" htmlFor='search'>Enter Name</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="off"
                            className={enabled
                                ? focusedIndex === 0
                                    ? 'input-focus' 
                                    : ''
                                : ''
                            }
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="enter name"
                            aria-invalid={!name}
                        >
                        </input>
                        {!name &&
                        <span className="form-info" aria-hidden="true">Name Required</span>
                        }
                        <label className="sr-only" htmlFor='search'>Enter Email</label>
                        <input
                            id="email"
                            name="email"
                            type="text"
                            autoComplete="off"
                            className={enabled
                                ? focusedIndex === 1 
                                    ? 'input-focus' 
                                    : ''
                                : ''
                            }
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="enter email"
                            aria-invalid={!validEmail}
                        >
                        </input>
                        {!validEmail &&
                        <span className="form-info" aria-hidden="true">Invalid Email Address</span>
                        }
                        <label className="sr-only" htmlFor='search'>Write a Message ({characterMinimum} - {characterLimit} characters)</label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}                            
                            className={enabled
                                ? focusedIndex === 2 
                                    ? 'input-focus' 
                                    : ''
                                : ''
                            }
                            placeholder={`write message (${characterMinimum} - ${characterLimit} characters)`}
                            aria-invalid={!(messageLength >= characterMinimum)}
                        />
                        
                        <span className="form-info" aria-hidden="true">{messageLength}/{characterLimit}</span>
                        <button
                            className={
                                !name || mutation.isPending || !validEmail || !(messageLength >= characterMinimum)
                                ? focusedIndex === 3 ? `form-button button-focus-dark`:`submit-dark form-button`
                                : focusedIndex === 3 ? 'form-button button-focus' 
                                : 'form-button'
                            }
                            type='submit'
                            onKeyDown={(e) => {
                                // Only handle arrow keys here; other keys behave normally
                                if (e.key === 'Enter' && name && !mutation.isPending && validEmail && messageLength >= characterMinimum) {
                                    handleSubmit(e)
                                }
                            }}
                        >
                            <h3>Submit Message</h3>       
                        </button>       
                    </form>
                </div>
                <div className="control-container">
                    <div className="control-box">
                        <div>
                            exit<br />
                            <kbd>Esc</kbd>
                        </div>
                        <div>
                            next<br />
                            &darr;                    
                        </div>
                        <div>
                            prev<br />
                            &uarr;                   
                        </div>
                        <div>
                            slct<br />
                            &crarr;
                        </div>       
                    </div>
                </div>
            </main>
        </>
    );
}

export default ContactForm