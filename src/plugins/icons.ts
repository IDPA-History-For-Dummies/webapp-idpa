import {IconDefinition, library} from '@fortawesome/fontawesome-svg-core';
import {
	faAngleDown,
	faArrowDownShortWide,
	faArrowDownWideShort,
	faArrowLeft,
	faArrowLeftToLine,
	faArrowRight,
	faArrowRightToLine,
	faCalendar,
	faCheck,
	faCircle,
	faCircleDot,
	faCog,
	faCopy,
	faDraftingCompass,
	faEllipsisVertical,
	faExclamationCircle,
	faEye,
	faEyeSlash,
	faFile,
	faFloppyDisk,
	faHome,
	faInfoCircle,
	faMinus,
	faPalette,
	faPen,
	faPlus,
	faQuestion,
	faRotate,
	faSitemap,
	faSpinner,
	faSquare as fasFaSquare,
	faSquareDashed,
	faStar as fasFaStar,
	faStarHalfStroke,
	faTicketAlt,
	faTimes,
	faTrash,
	faTriangleExclamation
} from '@fortawesome/pro-solid-svg-icons';
import {faSquare as farFaSquare, faSquareCheck, faStar as farFaStar} from '@fortawesome/pro-regular-svg-icons';

// library.add(fas);
// library.add(far);

export class Icons {

	protected static REGISTERED_ICONS: Set<string> = new Set<string>();
	protected static ICON_MAP: Map<string, string> = new Map<string, string>();

	// VUETIFY ICONS (@\node_modules\vuetify\lib\iconsets\fa-svg.d.mts)

	public complete = Icons.convert(faCheck);
	public cancel = Icons.convert(faTimes);
	public close = Icons.convert(faTimes);
	public delete = Icons.convert(faTrash);
	public clear = Icons.convert(faTimes);
	public success = Icons.convert(faCheck);
	public info = Icons.convert(faInfoCircle);
	public warning = Icons.convert(faExclamationCircle);
	public error = Icons.convert(faTriangleExclamation);
	public prev = Icons.convert(faArrowLeft);
	public next = Icons.convert(faArrowRight);
	public checkboxOn = Icons.convert(faSquareCheck);
	public checkboxOff = Icons.convert(farFaSquare);
	public checkboxIndeterminate = Icons.convert(faSquareDashed);
	public delimiter = Icons.convert(faQuestion);
	public sortAsc = Icons.convert(faArrowDownShortWide);
	public sortDesc = Icons.convert(faArrowDownWideShort);
	public expand = Icons.convert(faAngleDown);
	public menu = Icons.convert(faEllipsisVertical);
	public subgroup = Icons.convert(faAngleDown);
	public dropdown = Icons.convert(faAngleDown);
	public radioOn = Icons.convert(faCircleDot);
	public radioOff = Icons.convert(faCircle);
	public edit = Icons.convert(faPen);
	public ratingEmpty = Icons.convert(farFaStar);
	public ratingFull = Icons.convert(fasFaStar);
	public ratingHalf = Icons.convert(faStarHalfStroke);
	public loading = Icons.convert(faSpinner);
	public first = Icons.convert(faArrowLeftToLine);
	public last = Icons.convert(faArrowRightToLine);
	public unfold = Icons.convert(faQuestion);
	public file = Icons.convert(faFile);
	public plus = Icons.convert(faPlus);
	public minus = Icons.convert(faMinus);
	public calendar = Icons.convert(faCalendar);

	// PHONE MEMO ICONS

	public home = Icons.convert(faHome);
	public save = Icons.convert(faFloppyDisk);
	public show = Icons.convert(faEye);
	public hide = Icons.convert(faEyeSlash);
	public copy = Icons.convert(faCopy);
	public reload = Icons.convert(faRotate);
	public color = Icons.convert(faPalette);
	public colorValue = Icons.convert(fasFaSquare);

	// ASI ICONS

	public slaTicket = Icons.convert(faTicketAlt);
	public slaTicketCategory = Icons.convert(faSitemap);
	public statePlanning = Icons.convert(faSitemap);
	public globalSetting = Icons.convert(faCog);
	public system = Icons.convert(faDraftingCompass);

	public constructor() {
		Object.entries(this).forEach(e => {
			if (typeof e[1] === 'string') {
				Icons.ICON_MAP.set(e[0], e[1]);
			}
		});
	}

	public static convert(definition: IconDefinition): string {
		const ret = `${definition.prefix} fa-${definition.iconName}`;
		if (!this.REGISTERED_ICONS.has(ret)) {
			library.add(definition);
			this.REGISTERED_ICONS.add(ret);
		}
		return ret;
	}

	public iconByPropertyName(icon: string): string | undefined {
		return Icons.ICON_MAP.get(icon);
	}

}

const instance = new Icons();

export default function useIcons(): Icons {
	return instance;
}
