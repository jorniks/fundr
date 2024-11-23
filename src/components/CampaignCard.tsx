import Image from 'next/image'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/button'

const CampaignCard = () => {
  return (
    <Dialog>
      <DialogTrigger className="">
        <div className="flex flex-col h-full border border-white/5 hover:border-transparent hover:shadow-lg transition duration-300 rounded-lg p-5 bg-white/10">
          <Image width={100} height={100} className="w-full object-cover rounded-md" alt="Proposal Image" src="https://images.unsplash.com/photo-1665686376173-ada7a0031a85" />

          <div className="space-y-1 my-4">
            <h3 className="">Announcing a free plan for small teams</h3>

            <article className="text-sm">At Wake, our mission has always been focused on bringing openness.</article>
          </div>

          <div className="mt-auto flex items-center gap-x-3">
            <Image width={100} height={100} className="size-8 rounded-full" alt="User Avatar"
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"
            />

            <h5 className="text-sm text-gray-300">0x23.....38df</h5>
          </div>
        </div>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Campaign Title</DialogTitle>

          <DialogDescription>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium ipsa, qui quidem exercitationem beatae natus, quis dolor, aperiam magnam atque architecto nemo. Omnis odit modi corrupti assumenda id? Dolore, libero?
          </DialogDescription>
        </DialogHeader>
        
        <div className="pb-6 gap-x-2 space-y-6">
          <input type="number" className="text-box" placeholder='Donation amount' />
          <Button className="w-full max-w-[50%] py-4 btn lime font-medium">Donate</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CampaignCard