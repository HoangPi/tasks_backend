import { EntitySubscriberInterface, EventSubscriber, InsertEvent, LessThanOrEqual, MoreThanOrEqual, TypeORMError } from "typeorm";
import { Sprint  } from "../sprint.entity";

@EventSubscriber()
export class SprintSubscriber implements EntitySubscriberInterface<Sprint> {
    constructor(
    ) {  }

    listenTo(): Function | string {
        return Sprint
    }

    async beforeInsert(event: InsertEvent<Sprint>): Promise<any | void> {
        const createdAt = new Date(event.entity.createdAt)
        const endAt = new Date(event.entity.endAt)
        if (createdAt.getTime() >= endAt.getTime()) {
            throw new TypeORMError("End date must be later than start date")
        }
        const [_, count] = await event.manager.findAndCount(Sprint, {
            where: [
                {
                    createdAt: LessThanOrEqual(event.entity.createdAt),
                    endAt: MoreThanOrEqual(event.entity.createdAt)
                },
                {
                    createdAt: LessThanOrEqual(event.entity.endAt),
                    endAt: MoreThanOrEqual(event.entity.endAt)
                },
                {
                    createdAt: MoreThanOrEqual(event.entity.createdAt),
                    endAt: LessThanOrEqual(event.entity.endAt)
                }
            ]
        })
        if(count > 0){
            throw new TypeORMError("Overlapping sprint detected")
        }
    }
}