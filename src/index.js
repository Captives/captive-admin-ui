import Button from '/packages/button';
import Input from '/packages/input';
import Fullscreen from '/packages/fullscreen';

import {
    Pagination,
    Dialog,
    Autocomplete,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    InputNumber,
    Radio,
    RadioGroup,
    RadioButton,
    Checkbox,
    CheckboxButton,
    CheckboxGroup,
    Switch,
    Select,
    Option,
    OptionGroup,
    ButtonGroup,
    Table,
    TableColumn,
    DatePicker,
    TimeSelect,
    TimePicker,
    Popover,
    Tooltip,
    Breadcrumb,
    BreadcrumbItem,
    Form,
    FormItem,
    Tabs,
    TabPane,
    Tag,
    Tree,
    Alert,
    Slider,
    Icon,
    Row,
    Col,
    Upload,
    Progress,
    Spinner,
    Badge,
    Card,
    Rate,
    Steps,
    Step,
    Carousel,
    CarouselItem,
    Collapse,
    CollapseItem,
    Cascader,
    ColorPicker,
    Transfer,
    Container,
    Header,
    Aside,
    Main,
    Footer,
    Timeline,
    TimelineItem,
    Link,
    Divider,
    Image,
    Calendar,
    Backtop,
    PageHeader,
    CascaderPanel,
    Loading,
    MessageBox,
    Message,
    Notification
} from "element-ui";

import locale from 'element-ui/src/locale';
import InfiniteScroll from 'element-ui/packages/infinite-scroll/index.js';
import CollapseTransition from 'element-ui/src/transitions/collapse-transition';

Pagination.name = "JrPagination";
Dialog.name = "JrDialog";
Autocomplete.name = "JrAutocomplete";
Dropdown.name = "JrDropdown";
DropdownMenu.name = "JrDropdownMenu";
DropdownItem.name = "JrDropdownItem";
Menu.name = "JrMenu";
Submenu.name = "JrSubmenu";
MenuItem.name = "JrMenuItem";
MenuItemGroup.name = "MenuItemGroup";
InputNumber.name = "JrInputNumber";
Radio.name = "JrRadio";
RadioGroup.name = "JrRadioGroup";
RadioButton.name = "JrRadioButton";
Checkbox.name = "JrCheckbox";
CheckboxButton.name = "CheckboxButton";
CheckboxGroup.name = "JrCheckboxGroup";
Switch.name = "JrSwitch";
Select.name = "JrSelect";
Option.name = "JrOption";
OptionGroup.name = "JrOptionGroup";
ButtonGroup.name = "JrButtonGroup";
Table.name = "JrTable";
TableColumn.name = "JrTableColumn";
DatePicker.name = "JrDatePicker";
TimeSelect.name = "JrTimeSelect";
TimePicker.name = "JrTimePicker";
Popover.name = "JrPopover";
Tooltip.name = "JrTooltip";
Breadcrumb.name = "JrBreadcrumb";
BreadcrumbItem.name = "JrBreadcrumbItem";
Form.name = "JrForm";
FormItem.name = "JrFormItem";
Tabs.name = "JrTabs";
TabPane.name = "JrTabPane";
Tag.name = "JrTag";
Tree.name = "JrTree";
Alert.name = "JrAlert";
Slider.name = "JrSlider";
Icon.name = "JrIcon";
Row.name = "JrRow";
Col.name = "JrCol";
Upload.name = "JrUpload";
Progress.name = "JrProgress";
Spinner.name = "JrSpinner";
Badge.name = "JrBadge";
Card.name = "JrCard";
Rate.name = "JrRate";
Steps.name = "JrSteps";
Step.name = "JrStep";
Carousel.name = "JrCarousel";
CarouselItem.name = "JrCarouselItem";
Collapse.name = "JrCollapse";
CollapseItem.name = "JrCollapseItem";
Cascader.name = "JrCascader";
ColorPicker.name = "JrColorPicker";
Transfer.name = "JrTransfer";
Container.name = "JrContainer";
Header.name = "JrHeader";
Aside.name = "JrAside";
Main.name = "JrMain";
Footer.name = "JrFooter";
Timeline.name = "JrTimeline";
TimelineItem.name = "JrTimelineItem";
Link.name = "JrLink";
Divider.name = "JrDivider";
Image.name = "JrImage";
Calendar.name = "JrCalendar";
Backtop.name = "JrBacktop";
PageHeader.name = "JrPageHeader";
CascaderPanel.name = "JrCascaderPanel";

const components = [
    Button,
    Input,
    Fullscreen,
    Pagination,
    Dialog,
    Autocomplete,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    InputNumber,
    Radio,
    RadioGroup,
    RadioButton,
    Checkbox,
    CheckboxButton,
    CheckboxGroup,
    Switch,
    Select,
    Option,
    OptionGroup,
    ButtonGroup,
    Table,
    TableColumn,
    DatePicker,
    TimeSelect,
    TimePicker,
    Popover,
    Tooltip,
    Breadcrumb,
    BreadcrumbItem,
    Form,
    FormItem,
    Tabs,
    TabPane,
    Tag,
    Tree,
    Alert,
    Slider,
    Icon,
    Row,
    Col,
    Upload,
    Progress,
    Spinner,
    Badge,
    Card,
    Rate,
    Steps,
    Step,
    Carousel,
    CarouselItem,
    Collapse,
    CollapseItem,
    Cascader,
    ColorPicker,
    Transfer,
    Container,
    Header,
    Aside,
    Main,
    Footer,
    Timeline,
    TimelineItem,
    Link,
    Divider,
    Image,
    Calendar,
    Backtop,
    PageHeader,
    CascaderPanel,
    CollapseTransition
];

const install = function(Vue, opts = {}) {
    locale.use(opts.locale);
    locale.i18n(opts.i18n);

    components.forEach(component => {
        Vue.component(component.name, component);
    });

    Vue.use(InfiniteScroll);
    Vue.use(Loading.directive);

    Vue.prototype.$ELEMENT = {
        size: opts.size || '',
        zIndex: opts.zIndex || 2000
    };

    Vue.prototype.$loading = Loading.service;
    Vue.prototype.$msgbox = MessageBox;
    Vue.prototype.$alert = MessageBox.alert;
    Vue.prototype.$confirm = MessageBox.confirm;
    Vue.prototype.$prompt = MessageBox.prompt;
    Vue.prototype.$notify = Notification;
    Vue.prototype.$message = Message;
}

// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}


let library = {
    //UI库版本号
    version: '1.0.0',
    locale: locale.use,
    i18n: locale.i18n,
    // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
    install,
    Button,
    Input,
    Fullscreen,
    InfiniteScroll
};

// 以下是具体的组件列表，供按需引入使用
components.forEach(component => {
    library[component.name] = component;
});

console.log('library', library);

export default library;