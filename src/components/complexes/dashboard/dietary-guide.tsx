'use client';

import { Utensils } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';

export function DietaryGuide() {
  const t = useTranslations('DietaryGuide');

  const tips = [
    { title: t('tips.reduceSugar'), content: t('tips.useNaturalSweeteners') },
    { title: t('tips.chooseLowSodium'), content: t('tips.useHerbs') },
    { title: t('tips.healthyFats'), content: t('tips.unsaturatedFats') },
  ];

  const recipes = [
    { name: t('recipes.grilledChickenSalad'), type: t('types.lowFat') },
    { name: t('recipes.vegetableStirFry'), type: t('types.lowSodium') },
    { name: t('recipes.berrySmoothieBowl'), type: t('types.lowSugar') },
  ];

  return (
    <ScrollArea className="h-[300px] w-full rounded-md border">
      <div className="p-4">
        <h3 className="mb-4 text-lg font-semibold">{t('expertTips')}</h3>
        {tips.map((tip, index) => (
          <div key={index} className="mb-4">
            <h4 className="font-medium">{tip.title}</h4>
            <p className="text-sm text-muted-foreground">{tip.content}</p>
          </div>
        ))}
        <h3 className="mb-4 text-lg font-semibold">{t('healthyRecipes')}</h3>
        {recipes.map((recipe, index) => (
          <div key={index} className="mb-4 flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt={recipe.name} />
              <AvatarFallback><Utensils className="size-4" /></AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">{recipe.name}</p>
              <p className="text-sm text-muted-foreground">{recipe.type}</p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
