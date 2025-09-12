import { useState, useEffect } from 'react';
import { usePostContact } from './useContactApi';
import type { ContactTypes } from '../../types/contactTypes';

import { useUser } from '../../features/profile/useUserApi';
import { useProjects } from '../../features/projects/useProjectsApi';
import { useKeyboardNavStore } from "../../stores/keyboardNavStore";

interface ContactFormProps {
  projectId?: ContactTypes['projectId'];
};


const ContactForm = ({ projectId }: ContactFormProps) => {
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const mutation = usePostContact();

    const focusedIndex = useKeyboardNavStore((s) => s.focusedIndex);
    const setLinkCount = useKeyboardNavStore((s) => s.setLinkCount);
    const setFocusedIndex = useKeyboardNavStore((s) => s.setFocusedIndex);

    const {
        data: user,
        isError: isUserError,
    } = useUser();

    const {
        data: projects,
        isError,
    } = useProjects();

    const project = projects?.find((p) => Number(p.id) === Number(projectId));
    console.log(Number(projectId))
    const handleSubmit = (e: React.FormEvent) => {
        //e.preventDefault();
        console.log("do something else")
        const payload: ContactTypes = {
            projectId: projectId,
            message,
            name,
            email,
        };
        mutation.mutate(payload);
    };

    useEffect(() => {
        if (!user && !projectId) return;
        const pageLinks = Array.from(document.querySelectorAll<
            HTMLInputElement | 
            HTMLButtonElement |
            HTMLTextAreaElement
            >('input, button, textarea'));
        setFocusedIndex(0);
        setLinkCount(pageLinks.length-1);
        pageLinks[0].focus();
    }, [user, projectId]);

    useEffect(() => {
        const pageLinks = Array.from(document.querySelectorAll<
            HTMLInputElement | 
            HTMLButtonElement | 
            HTMLTextAreaElement
            >('input, button, textarea'));
        const current = pageLinks[focusedIndex % pageLinks.length];            
        if (current) current.focus();
    }, [focusedIndex])


    if (isError || isUserError || !user || !projects) return <p>Error loading data...</p>;

    // If submission succeeded, just show the success message
    if (mutation.isSuccess) {
            return (
            <div className="message-center">
                <p>Message sent successfully!</p>
                <p>Press Escape to go back.</p>
            </div>
            );
    }

    if (mutation.isError) {
            return (
            <div className="message-center">
                <p>Error Sending Message</p>
                <p>Press Escape to go back.</p>
            </div>
            );
    }

    

    // Otherwise show the form
    return (
        <>
            <main>
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
                            className={focusedIndex === 0 ? 'input-focus' : ''}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="enter name"
                        >
                        </input>
                        <label className="sr-only" htmlFor='search'>Enter Email</label>
                        <input
                            id="email"
                            name="email"
                            type="text"
                            autoComplete="off"
                            className={focusedIndex === 1 ? 'input-focus' : ''}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="enter email"
                        >
                        </input>
                        <label className="sr-only" htmlFor='search'>Write a Message (200 characters Max)</label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className={focusedIndex === 2 ? 'input-focus' : ''}
                            placeholder="write message (200 characters max)"
                        />
                        <button
                            className={focusedIndex === 3 ? 'form-button button-focus' : 'form-button'}
                            disabled={mutation.isPending}
                            type='submit'
                            onKeyDown={(e) => {
                                // Only handle arrow keys here; other keys behave normally
                                if (e.key === 'Enter') {
                                    console.log("do something")
                                    handleSubmit(e)
                                    // prevent cursor movement
                                    // Delegate to your global keyboard nav
                                }
                            }}
                        >
                            <h2>Submit Message</h2>       
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