import { Cards } from "../models/cards";

export const create = async (userId: number, content: string, color: string, projectId: number) => {
        const result = await Cards.create(
            {
                userId: userId,
                projectId: projectId,
                content: content,
                parent: null,
                storage: "card",
                color: color
            });
        return result;
    }

export const get = async (projectId: number) => {
        const cardInfo = await Cards.findAll({
            where: {
                projectId,
                storage: "card"
            },
            order: [["id", "DESC"]],
            raw: true
        });
        return cardInfo;
    }

export const remove = async (cardId: number) => {
        await Cards.destroy({ where: { id: cardId } });
    }