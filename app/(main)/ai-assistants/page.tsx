"use client"

import React, { useContext } from 'react'
import Image from 'next/image'
import AiAssistantsList from '@/services/AiAssistantsList'
import { Checkbox } from '@/components/ui/checkbox'
import { useState } from 'react'
import {BlurFade} from '@/components/magicui/blur-fade'
import { Button } from '@/components/continue'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { AuthContext } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

export type AiAssistant = {
  id: number;
  name: string;
  title: string;
  image: string;
  instruction: string;
  userInstruction: string;
  sampleQuestions: string[];
};

function page() {
  const [selectedAssistants, setSelectedAssistants] = useState<AiAssistant[]>([]);
  const inserAssistants = useMutation(api.userAiAssistants.InsertSelectedAssistants);
  const router = useRouter();
  
  const isAssistantSelected = (assistant: AiAssistant): boolean => {
    return selectedAssistants.some(item => item.id === assistant.id);
  };

  const {user}= useContext(AuthContext);
  
  const onSelect = (assistant: AiAssistant) => {
    const isSelected = isAssistantSelected(assistant);
    if (isSelected) {
      setSelectedAssistants(selectedAssistants.filter(item => item.id !== assistant.id));
    } else {
      setSelectedAssistants([...selectedAssistants, assistant]);
    }
  };

  const onContinue = async () => {
    try {
      if (selectedAssistants.length > 0 && user?.id) {
        // Take the first selected assistant and send it with the user ID
        const assistantToInsert = {
          ...selectedAssistants[0],
          uid: user.id
        };
        const result = await inserAssistants({
          records: assistantToInsert
        });
        router.push('/chat'); // Redirect to chat after successful insertion
      }
    } catch (error) {
      console.error('Error inserting assistant:', error);
    }
  };

  return (
    <div>
        <div className='px-10 mt-20 md:px-28 lg:px-36 xl:px-48'>
          <div className='flex '>
            <div className="flex-row justify-between items-center">
            <BlurFade delay={0.25 + 1 * 0.05} inView>
                <h2 className='text-3xl font-bold'>Welcome to the MarketPlace of AI assistants</h2>
                </BlurFade>
                <BlurFade delay={0.25 + 2 * 0.05} inView>
                <p className='text-gray-500 text-xl mt-2 mb-4 p-2'>
                    Here you can find a variety of AI assistants that can help you with different tasks. 
                    Whether you need help with writing, coding, or anything else, we have an assistant for you.
                </p>
                </BlurFade>
            </div>
            <Button disabled={selectedAssistants.length === 0} onClick={onContinue}/>
            </div>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-10 mt-10 md:px-28 lg:px-36 xl:px-48'>
          {AiAssistantsList.map((assistant,index) => (
            <BlurFade key={assistant.image} delay={0.25 + index * 0.05} inView>
            <div key={assistant.id}>
              <div className="flex items-center justify-between p-4 border-b border-gray-200 hover:border hover:scale-105 transition-all ease-in-out cursor-pointer relative" onClick={() => onSelect(assistant)}>
                <Checkbox 
                  className="absolute top-5 left-5" 
                  checked={isAssistantSelected(assistant)}
                />
                <Image src={assistant.image} alt={assistant.name} width={600} height={600} className="rounded-xl w-full h-[200px] object-cover" />
              </div>
              <h2 className='text-center font-bold text-lg'>{assistant.name}</h2>
              <h2 className="text-center text-gray-600 dark:text-gray-300">{assistant.title}</h2>
            </div>
            </BlurFade>
          ))}
        </div>
    </div>
  )
}

export default page