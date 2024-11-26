"use client";

import { useState } from "react";
import { Button } from "@/components/button"
import { preferredTokens } from "@/constants/addresses/preferred-tokens";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useWeb3React } from "@web3-react/core";
import NotConnectedWalletButton from "@/components/WalletButtons/NotConnected";
import { useNewCampaign } from "@/hooks/write/useNewCampaign";
import { retrievePreferredToken } from "@/functions/misc-functions";


const CreateCampaign = () => {
  const { account } = useWeb3React()
  const createNewCampaign = useNewCampaign()
  const [formValues, setFormValues] = useState({
    title: "",
    imageLink: "",
    description: "",
    token: "",
    goal: "",
    deadline: "",
    decimal: 6,
  })

  function updateFormValues(e: any) {
    setFormValues((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }

  return (
    <main className="container py-40">
      <div className="grid md:grid-cols-2 items-start gap-12">
        <section className="space-y-10">
          <aside className="space-y-3">
            <h1 className="text-5xl">Start Your Campaign</h1>
            <article className="">
              Launch your fundraising campaign and connect with supporters around the world.
            </article>
          </aside>

          <aside className="">
            <h2 className="text-2xl">What to Expect:</h2>

            <ul className="mt-2 space-y-2">
              <li className="flex justify-start items-center gap-x-3">
                <i className="bi bi-check2-circle text-lime-400 text-2xl"></i>
                <span className="">Easy setup and management</span>
              </li>

              <li className="flex gap-x-3 justify-start items-center">
                <i className="bi bi-check2-circle text-lime-400 text-2xl"></i>
                <span className="">Transparent funding and contributions</span>
              </li>
              
              <li className="flex gap-x-3 justify-start items-center">
                <i className="bi bi-check2-circle text-lime-400 text-2xl"></i>
                <span className="">Real-time tracking and analytics</span>
              </li>
            </ul>
          </aside>

          <aside className="space-y-3">
            <h2 className="text-2xl">Join Our Community of Creators:</h2>
            <article className="">Whether you&apos;re raising funds for a cause, project, or business, we are here to help you every step of the way.</article>
          </aside>
        </section>

        <section className="relative flex flex-col border rounded-xl p-4 sm:p-6 lg:p-10 border-gray-700 bg-white/5 space-y-10">
          <div className="grid gap-4 lg:gap-6">
            {/* Preferred Token */}
            <div>
              <label htmlFor="preferredToken" className="block mb-2 text-sm font-medium text-white">Preferred Token</label>

              <Select onValueChange={(value) => {
                setFormValues({
                  ...formValues,
                  token: value,
                  decimal: retrievePreferredToken(value)?.decimal
                })
              }}>
                <SelectTrigger className="text-box text-base py-3">
                  <SelectValue placeholder="Preferred Token" />
                </SelectTrigger>

                <SelectContent>
                  {preferredTokens.map((token, index) => (
                    <SelectItem key={index} value={token.address}>{token.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Campaign Image */}
            <div>
              <label htmlFor="imageLink" className="block mb-2 text-sm font-medium text-white">Campaign Image</label>
              
              <input type="url" id="imageLink" value={formValues.imageLink} onChange={updateFormValues} className="text-box" placeholder="Enter link to campaign image"
              />
            </div>
            
            {/* Campaign Title */}
            <div>
              <label htmlFor="title" className="block mb-2 text-sm font-medium text-white">Campaign Title</label>
              
              <input type="text" id="title" value={formValues.title} onChange={updateFormValues} className="text-box" placeholder="Enter campaign title"
              />
            </div>

            {/* Campaign Description */}
            <div>
              <label htmlFor="description" className="block mb-2 text-sm font-medium text-white">Description</label>
              
              <textarea id="description" className="text-box" placeholder="Describe your campaign" onChange={updateFormValues} value={formValues.description}></textarea>
            </div>

            {/* Funding Goal */}
            <div>
              <label htmlFor="goal" className="block mb-2 text-sm font-medium text-white">Funding Goal</label>
              
              <input type="number" id="goal" value={formValues.goal} onChange={updateFormValues} className="text-box" placeholder="Enter the funding goal" />
            </div>

            {/* Campaign Duration */}
            <div>
              <label htmlFor="deadline" className="block mb-2 text-sm font-medium text-white">Campaign Deadline</label>
              
              <input type="datetime-local" id="deadline" value={formValues.deadline} onChange={updateFormValues} className="text-box" min={new Date().toISOString().slice(0, 16)} />
            </div>
          </div>

          {!account ?
            <NotConnectedWalletButton buttonClass="w-full rounded py-4" />
          :
            <Button className="btn lime py-4" onClick={() => {
              createNewCampaign(formValues).then(response => {
                if (response === true) {
                  setFormValues({
                    title: "",
                    imageLink: "",
                    description: "",
                    token: "",
                    goal: "",
                    deadline: "",
                    decimal: 6,
                  })
                }
              })
            }}>Create Campaign</Button>
          }
        </section>
      </div>
    </main>
  )
}

export default CreateCampaign