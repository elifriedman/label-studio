import React, { FC, useCallback } from "react";
import { observer } from "mobx-react";
import { Block, Elem } from "../../../utils/bem";
import { Button } from "../../../common/Button/Button";
import './RelationsControls.styl';
import { IconOutlinerEyeClosed, IconOutlinerEyeOpened, IconSortDownNew, IconSortUpNew } from "../../../assets/icons";


const RelationsControlsComponent: FC<any> = ({ relationStore }) => {
    return (
        <Block name='relation-controls'>
            <ToggleRelationsVisibilityButton relationStore={relationStore} />
            <ToggleRelationsOrderButton relationStore={relationStore} />
        </Block>
    )
}

interface ToggleRelationsVisibilityButtonProps {
    relationStore: any;
}

const ToggleRelationsVisibilityButton = observer<FC<ToggleRelationsVisibilityButtonProps>>(({ relationStore }) => {
    const toggleRelationsVisibility = useCallback(
        (e: any) => {
            e.preventDefault();
            e.stopPropagation();
            relationStore.toggleAllVisibility();
        },
        [relationStore]
    )

    const isDisabled = !relationStore?.relations?.length;
    const isAllHidden = !(!isDisabled && relationStore.isAllHidden);

    return (
        <Elem
            tag={Button}
            type="text"
            disabled={isDisabled}
            onClick={toggleRelationsVisibility}
            mod={{ hidden: isAllHidden }}
            aria-label={isAllHidden ? 'Show all relations' : 'Hide all relations'}
            icon={isAllHidden ? <IconOutlinerEyeClosed /> : <IconOutlinerEyeOpened />}
            tooltip={isAllHidden ? 'Show all relations' : 'Hide all relations'}
            tooltipTheme="dark"
        />
    );
})

interface ToggleRelationsOrderButtonProps {
    relationStore: any;
}

const ToggleRelationsOrderButton = observer<FC<ToggleRelationsOrderButtonProps>>(({ relationStore }) => {
    const toggleRelationsOrder = useCallback(
        (e: any) => {
            e.preventDefault();
            e.stopPropagation();
            relationStore.toggleOrder();
        },
        [relationStore]
    )

    const isDisabled = !relationStore?.relations?.length;
    const isAsc = relationStore.order === 'asc';

    return (
        <Elem
            tag={Button}
            type="text"
            onClick={toggleRelationsOrder}
            disabled={isDisabled}
            mod={{ order: relationStore.order }}
            aria-label={isAsc ? 'Sort by ascending' : 'Sort by descending'}
            icon={isAsc ? <IconSortUpNew /> : <IconSortDownNew />}
            tooltip={isAsc ? 'Sort by ascending' : 'Sort by descending'}
            tooltipTheme="dark"
        />
    );
})

export const RelationsControls = observer(RelationsControlsComponent);