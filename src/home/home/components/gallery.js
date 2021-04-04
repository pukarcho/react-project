import { Image, Row, Col } from 'antd';

function Gallery({ data }) {

    return (
        <Image.PreviewGroup>
            <Row>
                <Col span={12}>
                    <Image
                        width="100%"
                        height="100%"
                        style={{objectFit: "contain"}}
                        src={data.images && typeof data.images[0] !== "undefined" ? data.images[0] : "nope"}
                        fallback="https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"
                    />
                </Col>
                <Col span={12}>
                    <Image
                        width="100%"
                        height="100%"
                        style={{objectFit: "contain"}}
                        src={data.images && typeof data.images[1] !== "undefined" ? data.images[1] : "nope"}
                        fallback="https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"
                    />
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Image
                        width="100%"
                        height="100%"
                        style={{objectFit: "contain"}}
                        src={data.images && typeof data.images[2] !== "undefined" ? data.images[2] : "nope"}
                        fallback="https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"
                    />
                </Col>
                <Col span={12}>
                    <Image
                        width="100%"
                        height="100%"
                        style={{objectFit: "contain"}}
                        src={data.images && typeof data.images[3] !== "undefined" ? data.images[3] : "nope"}
                        fallback="https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"
                    />
                </Col>
            </Row>
        </Image.PreviewGroup>
    );
}

export default Gallery;